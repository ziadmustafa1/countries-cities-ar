import { Sidebar } from '@/components/docs/Sidebar';
import { MobileSidebar } from '@/components/docs/MobileSidebar';
import { TopNav } from '@/components/docs/TopNav';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0d1117] pt-4">
      <div className="flex gap-4 px-4">
        <Sidebar />
        <div className="flex-1">
          <TopNav />
          <main className="mt-4">
            <div className="p-6 sm:p-8 lg:p-12">
              {children}
            </div>
          </main>
        </div>
      </div>
      <MobileSidebar />
    </div>
  );
}
