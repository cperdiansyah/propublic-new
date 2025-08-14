import API from '@shared/config/api'
import { api } from '@shared/services/axios'
import { useQuery, type QueryKey } from '@tanstack/react-query'

type ApiEnvelope<Data> = {
  success: boolean
  status_code: number
  data: Data
}

export type ShopPartner = {
  id: number
  name: string
  logo_url: string
  shop_url: string
  description: string
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

type ShopList = Array<ShopPartner>

const SHOP_QUERY_KEY: QueryKey = ['partners', 'shops']

// Fetcher with axios instance
const fetchShops = async (): Promise<ShopList> => {
  const res = await api.get<ApiEnvelope<unknown>>(API.APP.SHOP)

  if (!res.data?.success || !Array.isArray(res.data?.data)) {
    throw new Error('Unexpected API shape for /shops')
  }

  const items = (res.data.data as Array<Record<string, unknown>>).filter(
    (x) => {
      return (
        typeof x.id === 'number' &&
        typeof x.name === 'string' &&
        typeof x.logo_url === 'string' &&
        typeof x.shop_url === 'string' &&
        typeof x.is_active === 'boolean'
      )
    },
  ) as ShopList

  items.sort((a, b) => {
    if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order
    return a.name.localeCompare(b.name)
  })

  return items.filter((s) => s.is_active)
}

const useShops = () => {
  return useQuery({
    queryKey: SHOP_QUERY_KEY,
    queryFn: fetchShops,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: (failureCount, error) => {
      if (failureCount >= 2) return false
      return !(
        error instanceof Error && /Unexpected API shape/.test(error.message)
      )
    },
  })
}

export default useShops
