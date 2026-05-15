import { createFileRoute } from '@tanstack/react-router';
import AddPackage from '../../components/Forms/AddPackage';

export const Route = createFileRoute('/_app/add-package')({
  component: AddPackagePage,
});

function AddPackagePage() {
  return (
    <div className="pt-20 bg-slate-50 dark:bg-boxdark-2 min-h-screen">
      <AddPackage />
    </div>
  );
}
