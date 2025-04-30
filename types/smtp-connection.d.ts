declare module 'smtp-connection' {
  interface SMTPConnectionOptions {
    port?: number;
    host?: string;
    secure?: boolean;
    tls?: {
      rejectUnauthorized?: boolean;
    };
  }

  interface RcptOptions {
    to: string;
  }

  class SMTPConnection {
    constructor(options: SMTPConnectionOptions);
    connect(callback: (err: Error | null) => void): void;
    helo(hostname: string, callback: (err: Error | null) => void): void;
    rcpt(options: RcptOptions, callback: (err: Error | null) => void): void;
    quit(): void;
  }

  export default SMTPConnection;
} 