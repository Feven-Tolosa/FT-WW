import { redirect } from 'next/navigation'

export default async function FurniturePage({
  params,
}: {
  params: { id: string }
}) {
  redirect(`/product/${params.id}`)
}
