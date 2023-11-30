import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function FileUploader() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>("");
  const [tags, setTags] = useState<string[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    if (FileReader && acceptedFiles && acceptedFiles.length) {
      const fr = new FileReader();
      fr.onload = function () {
        setImageSrc(fr.result);
      };
      fr.readAsDataURL(acceptedFiles[0]);
    }

    try {
      setIsLoading(true);
      const res = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      const {
        choices: [
          {
            message: { content },
          },
        ],
      } = await res.json();

      const tags = content.split(",").map((tag: string) => tag.trim());

      setTags(tags);
    } catch (e) {
      setTags([]);
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
    {...getRootProps()}
      className="bg-white rounded-2xl min-w-40 min-h-32 p-8 shadow-2xl flex flex-row gap-2 items-start transition-all cursor-pointer"
      style={{
        transition: "all .3s ease-in-out",
      }}
    >
      {!imageSrc && (
        <>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop a photo here ...</p>
          ) : (
            <p>Drag 'n' drop a photo here, or click to select a file</p>
          )}
        </>
      )}
      <img
        src={imageSrc as string}
        className={`bg-slate-900 block max-w-5xl max-h-[450px]`}
        style={{
          transition: "max-width 5s ease-out",
        }}
      />

      {imageSrc && (
        <div className="flex flex-col items-baseline gap-1">
          <p className={`text-sm ${isLoading ? "self-start" : ""} uppercase`}>Tags:</p>
          {isLoading ? (
            <div className="flex flex-row items-center gap-2 flex-wrap">
              {Array.from({ length: 16 }).map(
                (_, i) => (
                  <div
                    key={i}
                    className={`h-8 bg-slate-400 rounded animate-pulse uppercase`}
                    style={{
                      width: `${randomIntFromInterval(4, 12)}rem`,
                    }}
                  ></div>
                )
              )}
            </div>
          ) : (
            <div className="flex flex-row items-baseline gap-2 flex-wrap">
              {tags.map((tag) => (
                <span className="bg-slate-300 p-1 rounded-lg">{tag}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
    /*

    */
  );
}
