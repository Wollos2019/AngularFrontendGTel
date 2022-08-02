export class Pagination {
    itemsPerPage = 0;
    totalItems = 0;
    currentPage = 0;
    id = 'server';
    from = 0;
    to = 0;
    params = '&page=';
  
    constructor() {
    }
  
    setPagination(data: any, id?: string): any {
      const page = new Pagination();
      page.id = id ? id : 'server';
      page.totalItems = data.total;
      page.from = data.from;
      page.to = data.to;
      page.itemsPerPage = data.per_page;
      page.currentPage = data.current_page;
  
      return page;
    }
  }
  