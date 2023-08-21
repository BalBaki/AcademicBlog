import { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { useSearchParams } from 'react-router-dom';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import Loading from '../components/Loading';

export default function Pdf() {
    const [pageCount, setPageCount] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    const onDocumentLoadSuccess = ({ numPages }) => {
        setPageCount(numPages);
        setPageNumber(1);
    };
    const previousPage = () => {
        setPageNumber((current) => current - 1);
    };
    const nextPage = () => {
        setPageNumber((current) => current + 1);
    };

    return (
        <div className="w-full text-center">
            <Document
                file={'http://localhost:3005/file?name=' + searchParams.get('name')}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<Loading />}
            >
                <Page
                    pageNumber={pageNumber}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="flex justify-center items-center"
                    width={900}
                    scale={1.2}
                />
            </Document>
            {pageCount > 1 && (
                <div className="text-center">
                    <div className="text-xl text-white mt-2">
                        <button
                            disabled={pageNumber <= 1}
                            onClick={previousPage}
                            className="p-2 bg-red-500 rounded-full"
                        >
                            <GoChevronLeft />
                        </button>
                        <button
                            disabled={pageNumber >= pageCount}
                            onClick={nextPage}
                            className="p-2 bg-red-500 ml-2 rounded-full"
                        >
                            <GoChevronRight />
                        </button>
                    </div>

                    <div className="dark:text-white">
                        <p>
                            {pageNumber || (pageCount ? 1 : '--')} / {pageCount || '--'}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
