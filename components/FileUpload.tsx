'use client';

import { IKImage, ImageKitProvider, IKUpload } from 'imagekitio-next';
import config from '@/lib/config';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

interface Props {
  type: 'image';
  accept: string;
  placeholder: string;
  folder: string;
  variant: 'dark' | 'light';
  onFileChange: (filePath: string) => void;
  value?: string;
}

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
}: Props) => {
  const ikUploadRef = useRef<any>(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });

  const onError = (error: any) => {
    console.log(error);

    toast({
      title: 'Image upload failed',
      description: 'Your image could not be uploaded. Please try again.',
      variant: 'destructive',
    });
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: 'Image uploaded successfully',
      description: `${res.filePath} uploaded successfully`,
    });
  };

  const onValidate = (file: File) => {
    if (type === 'image' && file.size > 20 * 1024 * 1024) {
      toast({
        title: 'File size too large',
        description: 'Please upload a file that is less than 20MB in size',
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        folder={folder}
        accept={accept}
        className="hidden"
      />

      <div className="flex flex-col items-center">
        <button
          className="flex items-center justify-center px-4 py-2  cursor-pointer "
          onClick={(e) => {
            e.preventDefault();
            ikUploadRef.current?.click();
          }}
        >
          <Image
            src="/icons/upload.svg"
            alt="upload-icon"
            width={20}
            height={20}
            className="object-contain"
          />
          <p className="ml-2 text-base">{placeholder}</p>
        </button>

        {file.filePath && (
          <div className="mt-4 flex flex-col items-center">
            <p className="text-sm text-gray-600">{file.filePath}</p>
            <IKImage
              alt={file.filePath}
              path={file.filePath}
              width={500}
              height={300}
              className="mt-2 rounded object-fit"
            />
          </div>
        )}
      </div>
    </ImageKitProvider>
  );
};

export default FileUpload;
