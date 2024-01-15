import type { SearchPageProps } from '@app/components/pages/search';
import type { Metadata } from 'next';

import { SearchPage } from '@app/components/pages/search';
import { SEARCH_PAGE_METADATA } from '@app/constant/metadata';

export default SearchPage;

export const generateMetadata = async ({
  params: { search_query },
}: SearchPageProps): Promise<Metadata> => {
  return SEARCH_PAGE_METADATA({ search_query });
};
