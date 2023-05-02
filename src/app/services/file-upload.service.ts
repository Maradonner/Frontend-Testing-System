import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private http: HttpClient) {
  }

  onUpload(file: File, preset: string) {
    const fd = new FormData();
    fd.append("file", file)
    fd.append("upload_preset", preset)
    //fd.append("cloud_name", "dwa1jwp8z")
    return this.http.post('https://api.cloudinary.com/v1_1/dwa1jwp8z/image/upload', fd);
  }

}
