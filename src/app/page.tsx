import Dashboard from "./dashboard/page";

export const revalidate = 0;
export default async function Home() {
  return (
    <div className='flex flex-col'>
      <Dashboard />
    </div>
  )
}

