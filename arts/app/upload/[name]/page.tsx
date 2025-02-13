"use client"

import Link from "next/link"
import Image from "next/image"
import type { PutBlobResult } from '@vercel/blob';
import { Button } from "@/components/ui/button"
import { useRef, useEffect, useState } from "react";


export default function UploadPage({ params }: { params: { name: string } }) {
    const { name } = params
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const [hasPhoto, setHasPhoto] = useState(false);

    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: { width: 1920, height: 1080 }
        })
            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.error(err);
            })
}
    const takePhoto = () => {
        const width = 414;
        const height = width / (16 / 9);

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        setHasPhoto(true);
    }

    const closePhoto = () => {
        let photo = photoRef.current;
        let ctx = photo.getContext('2d');

        ctx.clearRect(0, 0, photo.width, photo.height);
        setHasPhoto(false);
    }
    
    useEffect(() => {
    getVideo();
    }, [videoRef])

    return (
        <div className="min-h-screen flex flex-col bg-pink-50">
            <header className="bg-pink-200 p-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-pink-800">New art by {name}</h1>
                <Link href="/">
                    <Button variant="outline" className="bg-white text-pink-800 border-pink-800 hover:bg-pink-100">
                    Back to Home
                    </Button>
                </Link>
            </header>

        <main className="flex-grow container mx-auto px-4 py-8">
                <div className="mb-8" id="camera">
                    <h2>Choose a file or take a photo</h2>
                    <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
          }

          const file = inputFileRef.current.files[0];

          const response = await fetch(
            `/upload/${name}?filename=${file.name}`,
            {
              method: 'POST',
              body: file,
            },
          );

          const newBlob = (await response.json()) as PutBlobResult;

          setBlob(newBlob);
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <Button type="submit">Upload</Button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}

                    <video ref={videoRef}></video>
                    <Button onClick={takePhoto}>SNAP!</Button>
                </div>
                <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
                    <canvas ref={photoRef}></canvas>
                    <Button onClick={closePhoto}>CLOSE</Button>
                    
                     
                </div>
                </main>
                
            


        </div>
    );
}