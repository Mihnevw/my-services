import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, Video, X } from "lucide-react";

type MediaType = "audio" | "video" | "both";

interface Notification {
  id: number;
  logo: string;
  title: string;
  message: string;
  time: string;
  mediaType: MediaType;
}

const notifications: Notification[] = [
  {
    id: 1,
    logo: "https://cdn.builtin.com/cdn-cgi/image/f=auto,fit=contain,w=200,h=200,q=100/https://builtinboston.com/sites/www.builtinboston.com/files/2020-09/TheeDigital%20Logo%20No%20Slogan%20-%20Horizontal%20RGB%20Transparent.png",
    title: "TheeDigital",
    message: "25 Top Web Design Trends 2025.",
    time: "now",
    mediaType: "audio",
  },
  {
    id: 2,
    logo: "https://upfirms.com/wp-content/uploads/2020/02/Digital-Silk-Logo.png",
    title: "Digital Silk",
    message: "How To Increase Website Conversion Rates: Top Strategies From Digital Experts.",
    time: "1m",
    mediaType: "video",
  },
  {
    id: 3,
    logo: "https://static.habilelabs.io/horizontal_logo_footer_and_logo_story_7fdebbfd54.svg",
    title: "Habile Labs",
    message: "A Complete SEO Guide for Web Developers.",
    time: "2m",
    mediaType: "both",
  },
];

const NOTIFICATION_DISPLAY_TIME = 7000;
const INITIAL_BATCH_SIZE = 2;
const SUBSEQUENT_BATCH_SIZE = 1;
const DRAG_THRESHOLD = 100;

const getRandomDelay = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

export function NotificationStack() {
  const [activeNotifications, setActiveNotifications] = useState<Notification[]>([]);
  const [processedCount, setProcessedCount] = useState(0);
  const [userDismissed, setUserDismissed] = useState(false);

  const removeNotification = (id: number, isManualDismiss = false) => {
    setActiveNotifications((prev) => prev.filter((n) => n.id !== id));
    if (isManualDismiss) {
      setUserDismissed(true);
    }
  };

  useEffect(() => {
    if (userDismissed || processedCount >= notifications.length) return;

    const showBatch = () => {
      const isInitialBatch = processedCount === 0;
      const batchSize = isInitialBatch ? INITIAL_BATCH_SIZE : SUBSEQUENT_BATCH_SIZE;
      const startIndex = processedCount;
      const endIndex = Math.min(startIndex + batchSize, notifications.length);
      const batch = notifications.slice(startIndex, endIndex);

      batch.forEach((notification, index) => {
        const addDelay = isInitialBatch ? index * 800 : 0;

        setTimeout(() => {
          setActiveNotifications((prev) => [...prev, notification]);
        }, addDelay);

        setTimeout(() => {
          if (!userDismissed) {
            removeNotification(notification.id);
          }
        }, NOTIFICATION_DISPLAY_TIME + getRandomDelay(0, 2000) + addDelay);
      });

      setProcessedCount(endIndex);
    };

    const initialDelay =
      processedCount === 0
        ? getRandomDelay(2000, 4000)
        : getRandomDelay(5000, 10000);

    const timeout = setTimeout(showBatch, initialDelay);
    return () => clearTimeout(timeout);
  }, [processedCount, userDismissed]);

  if (activeNotifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <AnimatePresence mode="popLayout">
        {activeNotifications.map((notification) => (
          <motion.div
            key={notification.id}
            layout
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={(_, { offset }) => {
              if (offset.x > DRAG_THRESHOLD) {
                removeNotification(notification.id, true);
              }
            }}
            className="w-[350px] flex items-start space-x-3 bg-white/75 dark:bg-gray-800/75 backdrop-blur p-3 shadow-lg rounded-xl border-gray-200 dark:border-gray-700 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-colors mb-4 cursor-grab active:cursor-grabbing group"
          >
            <div className="shrink-0 w-12 h-12 flex items-center justify-center">
              <img
                src={notification.logo}
                alt={notification.title}
                className="w-10 h-10 object-contain rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {notification.title}
                </div>
                {notification.mediaType && (
                  <div className="flex gap-0.5 items-center">
                    {(notification.mediaType === "audio" ||
                      notification.mediaType === "both") && (
                        <Headphones className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                      )}
                    {(notification.mediaType === "video" ||
                      notification.mediaType === "both") && (
                        <Video className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                      )}
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {notification.message}
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <button
                onClick={() => removeNotification(notification.id, true)}
                className="p-1 rounded-full hover:bg-gray-200"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
              <div className="text-xs text-gray-500 whitespace-nowrap">
                {notification.time}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
