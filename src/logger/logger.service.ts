import { ConsoleLogger, Injectable } from '@nestjs/common';
import { LogLevels } from './enum/logger.enum';
import { writeFile, stat, rename, mkdir } from 'fs/promises';
import { resolve, parse } from 'path';

const fileSize = Number(process.env.MAX_LOG_FILE_SIZE) || 100;
const kib = 1024;

@Injectable()
export class LoggingService extends ConsoleLogger {
  private maxFileSize: number;
  private pathToLogsFile: string;
  private fileLogs: string;
  private fileErrLogs: string;
  private ext: string;
  private logsFolder: string;

  constructor() {
    super();
    this.maxFileSize = fileSize * kib;
    this.logsFolder = 'logs';
    this.pathToLogsFile = `./${this.logsFolder}`;
    this.ext = '.log';
    this.fileLogs = `app-logs${this.ext}`;
    this.fileErrLogs = `app-errors${this.ext}`;
  }
  async log(message: string, context = '') {
    super.log(message, context);

    if (this.isLevelEnabled('log')) {
      const msg = this.modifiedMessage(message, LogLevels.LOG, context);
      await this.writeLog(msg, this.fileLogs);
    }
  }

  async error(message: string, stackOrContext = '') {
    super.error(message, stackOrContext);

    if (this.isLevelEnabled(LogLevels.ERROR)) {
      const msg = this.modifiedMessage(
        message,
        LogLevels.ERROR,
        stackOrContext,
      );
      await this.writeLog(msg, this.fileErrLogs);
    }
  }

  async warn(message: string, context = '') {
    super.warn(message, context);

    if (this.isLevelEnabled(LogLevels.WARN)) {
      const msg = this.modifiedMessage(message, LogLevels.WARN, context);
      await this.writeLog(msg, this.fileLogs);
    }
  }

  async debug(message: string, context = '') {
    super.debug(message, context);

    if (this.isLevelEnabled(LogLevels.DEBUG)) {
      const msg = this.modifiedMessage(message, LogLevels.DEBUG, context);
      await this.writeLog(msg, this.fileLogs);
    }
  }

  async verbose(message: string, context = '') {
    super.verbose(message, context);

    if (this.isLevelEnabled(LogLevels.VERBOSE)) {
      const msg = this.modifiedMessage(message, LogLevels.VERBOSE, context);
      await this.writeLog(msg, this.fileLogs);
    }
  }

  private async writeLog(msg: string, fileName: string) {
    const fullPath = resolve(this.pathToLogsFile, fileName);
    await this.createDir();
    await this.renameLogFile(fullPath);

    try {
      await writeFile(fullPath, `${msg}\n`, { flag: 'a' });
    } catch {
      return false;
    }
  }

  private modifiedMessage(msg: string, level: LogLevels, context: string) {
    return `${this.getTimestamp()} [${level.toUpperCase()}] [${context}] ${msg}`;
  }

  private async renameLogFile(fullPathToFile: string) {
    const { base: file, dir } = parse(fullPathToFile);

    try {
      const { size } = await stat(fullPathToFile);

      if (size > this.maxFileSize) {
        const newFilename = file.replace(this.ext, `-${Date.now()}.log`);
        await rename(fullPathToFile, resolve(dir, newFilename));
      }
    } catch {}
  }

  private async createDir(dirName = this.logsFolder) {
    try {
      await mkdir(dirName);
    } catch {}
  }
}
