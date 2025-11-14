'use client';

import React from "react"
import { useState } from 'react';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Button } from "@/components/ui/button";
import { Document, Page, pdfjs } from 'react-pdf';
import { toast } from 'sonner';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

export default function ResumePage({ params }: { params: { cid: string } }) {
    const { cid } = React.use(params);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);


    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    function goToPrevPage() {
        setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
    }

    function goToNextPage() {
        setPageNumber((prevPageNumber) =>
            numPages ? Math.min(prevPageNumber + 1, numPages) : prevPageNumber
        );
    }

    return (
        <div className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto">
            <div className="border rounded-lg overflow-hidden">
                <Document
                    file={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={(error) => toast.error(`Failed to load PDF: ${error.message}`)}
                    loading={
                        <div className="flex justify-center items-center h-96">
                            <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                    }
                >
                    <Page
                        pageNumber={pageNumber}
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                        width={800} 
                    />
                </Document>
            </div>

            <div className="flex items-center gap-4 p-2 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={goToPrevPage}
                    disabled={pageNumber <= 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <p className="text-sm font-medium">
                    Page {pageNumber} of {numPages || '--'}
                </p>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={goToNextPage}
                    disabled={!numPages || pageNumber >= numPages}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}