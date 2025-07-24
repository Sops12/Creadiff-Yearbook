'use client';

import WorkItemList from '@/components/WorkItemList';

export default function WorkTestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Work Items Test Page</h1>
      <p className="text-gray-600 mb-8">
        This page allows you to test the CRUD operations for work items. You can add, edit, and delete items,
        and upload images that will be stored in ImageKit.
      </p>
      <WorkItemList />
    </div>
  );
} 