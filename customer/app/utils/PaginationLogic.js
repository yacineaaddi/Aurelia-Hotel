import { itemsPerPage } from "./constants";

function paginationLogic(searchParams, data) {
  const currentPage = Math.max(1, Number(searchParams?.page) || 1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Prevent requests for pages beyond the last page
  const validPage = Math.min(currentPage, Math.max(1, totalPages));

  const startIndex = (validPage - 1) * itemsPerPage;

  const paginatedCabins = data.slice(startIndex, startIndex + itemsPerPage);

  return { validPage, totalPages, paginatedCabins };
}

export default paginationLogic;
