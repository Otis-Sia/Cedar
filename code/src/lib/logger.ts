export const logger = {
  info: (message: string, meta?: any) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, meta ? JSON.stringify(meta) : '');
  },
  error: (message: string, meta?: any) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, meta ? JSON.stringify(meta) : '');
  },
  warn: (message: string, meta?: any) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, meta ? JSON.stringify(meta) : '');
  },
  db: (operation: string, meta?: any) => {
    console.log(`[DATABASE] ${new Date().toISOString()} - ${operation}`, meta ? JSON.stringify(meta) : '');
  },
  server: (route: string, method: string, meta?: any) => {
    console.log(`[SERVER] ${new Date().toISOString()} - ${method} ${route}`, meta ? JSON.stringify(meta) : '');
  }
};
