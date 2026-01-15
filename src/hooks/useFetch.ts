import { useState, useEffect, useCallback } from 'react'

export const useFetch = <T, E = any>(url: string, reqOpt?: RequestInit) => {
  const [data, setData] = useState<T | undefined>()
  const [error, setError] = useState<E | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const fetchData = useCallback(async () => {
    setIsLoading(true)

    try {
      const res = await fetch(url, reqOpt)
      const result = await res.json()

      if (res.status === 200) {
        setIsSuccess(true)
        setData(result)
        setError(undefined)
      } else {
        setIsSuccess(false)
        setError(result)
        setData(undefined)
      }
    } catch (e) {
      setIsSuccess(false)
      setData(undefined)
      if (e instanceof Error) {
        setError(e as any)
      }
    } finally {
      setIsLoading(false)
    }
  }, [url, reqOpt])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const refetch = () => fetchData()

  return {
    data,
    error,
    isLoading,
    isError: !isSuccess && !isLoading,
    isSuccess,
    refetch,
  }
}
