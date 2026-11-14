import { useCallback, useEffect, useState } from 'react'
export function useApi(request, deps=[]) {
  const [data,setData]=useState(null),[loading,setLoading]=useState(true),[error,setError]=useState(null)
  const run=useCallback(async()=>{setLoading(true);setError(null);try{const result=await request();setData(result.data??result);return result}catch(e){setError(e);throw e}finally{setLoading(false)}},deps)
  useEffect(()=>{run().catch(()=>{})},[run])
  return {data,loading,error,refetch:run}
}
