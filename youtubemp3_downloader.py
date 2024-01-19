import tkinter as tk
from tkinter import filedialog
from tkinter import messagebox
from pytube import YouTube
import os

class YouTubeDownloaderApp:
    def __init__(self, root):
        self.root = root
        self.root.title("YouTube mp3 Downloader")
        self.root.geometry("400x320")

        self.video_url = ""
        self.folder_path = ""

        self.create_widgets()

    def create_widgets(self):
        label = tk.Label(self.root, text="YouTube Video URL:",
                         font=("Arial", 14))
        label.pack(padx=10, pady=(10, 0))

        self.video_url_text_area = tk.Text(self.root, wrap="word",
                                           height=10, width=40)
        self.video_url_text_area.pack(padx=10, pady=(0, 10))

        self.select_folder_button = tk.Button(self.root, text="Select Folder",
                                              cursor="hand2", command=self.select_folder)
        self.select_folder_button.pack(pady=10)


        download_button = tk.Button(self.root, text="Download",
                                    cursor="hand2",  command=self.download_video)
        download_button.pack(pady=10)

        buttons = [self.select_folder_button, download_button]
        for button in buttons:
            button.bind("<Enter>", self.change_color_on_hover)
            button.bind("<Leave>", self.restore_color_on_leave)

    def select_folder(self):
        self.folder_path = filedialog.askdirectory(title="Select Folder")

    def download_video(self):
        self.video_url = self.video_url_text_area.get("1.0", "end-1c")
        try:
            if self.folder_path != "":
                yt = YouTube(self.video_url)
                video = yt.streams.filter(only_audio=True).first()
                if self.folder_path == "":
                    out_file = video.download(output_path=destination)
                else:
                    out_file = video.download(output_path=self.folder_path)
                base, ext = os.path.splitext(out_file)
                new_file = base + '.mp3'
                os.rename(out_file, new_file)
                messagebox.showinfo("Successful!", "Video downloaded.")
            else:
                if self.video_url == "":
                    messagebox.showerror("Error!", "Please enter the video url!")
                else:
                    messagebox.showerror("Error!", "Please select folder first!")
        except:
            messagebox.showerror("Error!", "Something went wrong!")

    def change_color_on_hover(self, event):
        event.widget.config(bg="lightblue")

    def restore_color_on_leave(self, event):
        event.widget.config(bg="SystemButtonFace")


if __name__ == "__main__":
    root = tk.Tk()
    app = YouTubeDownloaderApp(root)
    root.mainloop()
