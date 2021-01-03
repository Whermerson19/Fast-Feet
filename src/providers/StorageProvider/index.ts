import fs from "fs";
import path from "path";

import uploadConfig from "../../config/upload";

export default class StorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.directory, file),
      path.resolve(uploadConfig.uploadFolder, file)
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePaht = path.resolve(uploadConfig.uploadFolder, file);

    try {
      await fs.promises.stat(filePaht);
    } catch {
      return;
    }

    await fs.promises.unlink(filePaht);
  }
}
