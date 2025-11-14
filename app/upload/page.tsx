'use client'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group"
import { Copy, Check } from "lucide-react"
import QRCode from 'react-qr-code';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/dropzone';
import { toast } from "sonner";
import { useState } from 'react';
import { pinata } from "@/utils/config";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import Link from "next/link";

import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/contract/config';

export default function Upload() {
    const { address, isConnected } = useAccount()
    const [files, setFiles] = useState<File[] | undefined>();
    const [url, setUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [isCopied, setIsCopied] = useCopyToClipboard();
    const [isDialogOpen, setIsDialogOpen] = useState(true);
    const [showQRCode, setShowQRCode] = useState('');
    const [cid, setCid] = useState('');

    const {
        data: hash,
        isPending,
        writeContract
    } = useWriteContract();

    async function SubmitCID(cid: string) {
        writeContract({
            address: CONTRACT_ADDRESS as `0x${string}`,
            abi: CONTRACT_ABI,
            functionName: 'setResume',
            args: [cid],
        })
    }

    const handleDrop = (files: File[]) => {
        console.log(files);
        setFiles(files);
    };

    const handleUpload = async () => {
        if (!files || files.length === 0) {
            toast.error("Please select a file to upload.");
            return;
        }

        const fileToUpload = files[0];

        try {
            setUploading(true);
            const urlRequest = await fetch("/api/url");
            const urlResponse = await urlRequest.json();

            const upload = await pinata.upload.public
                .file(fileToUpload)
                .url(urlResponse.url)

            const fileUrl = await pinata.gateways.public.convert(upload.cid)
            await SubmitCID(upload.cid);
            setCid(upload.cid);
            setUrl(fileUrl);
            setShowQRCode(fileUrl);
            setUploading(false);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "An unexpected error occurred during upload.");
            setUploading(false);
        }
    };

    const { isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })

    return (
        <div className="bg-white dark:bg-black flex flex-col items-center justify-evenly min-h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Upload Your Resume</CardTitle>
                    <CardDescription>
                        Instructions:
                        <ul className="list-disc list-inside">
                            <li>Click on the <span className="italic font-semibold">Browse Files</span> button or drag and drop your resume from your device.</li>
                            <li>Supported formats: PDF</li>
                            <li>Maximum file size: 5MB</li>
                            <li>After selecting the file, click the <span className="italic font-semibold">Upload</span> button to complete the process.</li>
                        </ul>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <Dropzone
                                maxSize={5 * 1024 * 1024}
                                maxFiles={1}
                                minSize={1024}
                                onDrop={handleDrop}
                                onError={(error) => toast.error(error.message)}
                                accept={{ 'application/pdf': [] }}
                                src={files}
                            >
                                <DropzoneEmptyState />
                                <DropzoneContent />
                            </Dropzone>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    {isConnected ? (
                        <Button onClick={() => { handleUpload() }} disabled={ uploading || !files || files.length === 0 || isPending} className="w-full bg-[#E43651] text-white hover:bg-[#c32c43] focus:ring-4 focus:ring-red-300 font-light">
                        {uploading ? "Uploading..." : "Upload"}
                    </Button>
                    ) : (

                    <Button disabled={ true } className="w-full bg-[#E43651] text-white hover:bg-[#c32c43] focus:ring-4 focus:ring-red-300 font-light">
                        {uploading ? "Uploading..." : "Upload"}
                    </Button>
                    )}
                </CardFooter>
            </Card>

            {url && isConfirmed && (
                <Dialog open={isDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Your file has been uploaded successfully!</DialogTitle>
                            <DialogDescription>
                                To view or share your uploaded file, use the link below:
                                <InputGroup className="my-4">
                                    <InputGroupInput placeholder={url} readOnly />
                                    <InputGroupAddon align="inline-end">
                                        <InputGroupButton
                                            aria-label="Copy"
                                            title="Copy"
                                            size="icon-xs"
                                            onClick={() => {
                                                setIsCopied(url);
                                                toast.success("Link copied to clipboard!");
                                            }}
                                        >
                                            {isCopied ? <Check /> : <Copy />}
                                        </InputGroupButton>
                                    </InputGroupAddon>
                                </InputGroup>
                                Or scan the QR code below to access your file:
                                <div className="mt-4 flex flex-col items-center">
                                    <div className="bg-white p-4">
                                        <QRCode value={showQRCode} size={150} />
                                    </div>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-center gap-4">
                            <Link href={`/resume/${cid}`} >
                                <Button className="bg-[#E43651] text-white hover:bg-[#c32c43] focus:ring-4 focus:ring-red-300 font-light">
                                    View File
                                </Button>
                            </Link>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" className="hover:bg-gray-200" onClick={() => setIsDialogOpen(false)}>
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )
            }
        </div>
    )
}