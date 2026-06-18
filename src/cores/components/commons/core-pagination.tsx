import { Fragment } from 'react';

import CoreGapY from '@/cores/components/commons/core-gap-y';
import { CORE_SETTING } from '@/cores/configs/core-setting.config';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/cores/shadcn/components/ui/pagination';

interface Props {
  handlePrevPage?: (step?: number) => void;
  handleNextPage?: (step?: number) => void;
  handleChangePage: (page: number) => void;
  currentPage: number;
  totalPages: number;
  lambda?: number;
}

export default function CorePagination({
  handlePrevPage,
  handleNextPage,
  handleChangePage,
  currentPage,
  totalPages,
  lambda = CORE_SETTING.RULE.PAGINATION.LAMBDA,
}: Readonly<Props>) {
  const pageItems = generatePageItems(currentPage, totalPages, 1);
  const isPrev = currentPage > 1;
  const isNext = currentPage < totalPages;

  const jumpPrev = () => handlePrevPage?.(lambda);
  const jumpNext = () => handleNextPage?.(lambda);

  if (pageItems.length <= 1) return null;

  return (
    <>
      <CoreGapY />
      <Pagination className='justify-end'>
        <PaginationContent>
          {isPrev && (
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePrevPage?.()} />
            </PaginationItem>
          )}

          {pageItems.map((item, idx) => {
            if (item === 'prev-ellipsis' || item === 'next-ellipsis') {
              return (
                <PaginationItem key={`ellipsis-${idx}`}>
                  <PaginationEllipsis onClick={item === 'prev-ellipsis' ? jumpPrev : jumpNext} />
                </PaginationItem>
              );
            }
            // number
            return (
              <PaginationItem key={`page-${item}-${idx}`}>
                <PaginationLink onClick={() => handleChangePage(item as number)} isActive={currentPage === item}>
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {isNext && (
            <PaginationItem>
              <PaginationNext onClick={() => handleNextPage?.()} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
}

function generatePageItems(currentPage: number, totalPages: number, windowSize = 1) {
  if (totalPages <= 1) return [] as (number | 'prev-ellipsis' | 'next-ellipsis')[];

  const pages: (number | 'prev-ellipsis' | 'next-ellipsis')[] = [];
  const left = Math.max(1, currentPage - windowSize);
  const right = Math.min(totalPages, currentPage + windowSize);

  // Left edge
  if (left > 1) {
    pages.push(1);
    if (left > 2) pages.push('prev-ellipsis');
  }

  // Middle window
  for (let p = left; p <= right; p++) pages.push(p);

  // Right edge
  if (right < totalPages) {
    if (right < totalPages - 1) pages.push('next-ellipsis');
    pages.push(totalPages);
  }

  return pages;
}

const generateSimplePagination = (totalPages: number) => {
  const pageItems = [];
  for (let i = 1; i <= totalPages; i++) {
    pageItems.push(i);
  }
  return pageItems;
};

const generatePlexPagination = (currentPage: number, totalPages: number, visiblePages: number) => {
  const pageItems: (number | string)[] = [];
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);

  handleLeadingPages(pageItems, currentPage, visiblePages);
  addRangePages(pageItems, startPage, endPage);
  handleTrailingPages(pageItems, currentPage, totalPages);

  return pageItems;
};

const handleLeadingPages = (pageItems: (number | string)[], currentPage: number, visiblePages: number) => {
  if (currentPage > 2) {
    pageItems.push(1);
    if (currentPage > visiblePages) {
      pageItems.push('...');
    }
  }
};

const handleTrailingPages = (pageItems: (number | string)[], currentPage: number, totalPages: number) => {
  if (currentPage < totalPages - 1) {
    if (currentPage < totalPages - 2) {
      pageItems.push('...');
    }
    pageItems.push(totalPages);
  }
};

const addRangePages = (pageItems: (number | string)[], startPage: number, endPage: number) => {
  for (let i = startPage; i <= endPage; i++) {
    pageItems.push(i);
  }
};
