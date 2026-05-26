import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTreeDataApi } from '@/services/general/tree-api';
import TreeContentBox from './tree-content-box';
import TreeNode from './tree-node';

export default function ResponsiveTree() {
  const [sideTreeOpen, setSideTreeOpen] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ['fetch tree data api'],
    queryFn: () => fetchTreeDataApi(),
    retry: false,
  });

  const toggleSidebar = () => {
    setSideTreeOpen((prev) => !prev);
  };

  return (
    <div className="relative ml-auto lg:hidden">
      <button
        onClick={toggleSidebar}
        className="absolute -top-5 right-0 z-50 w-10 rounded-md p-2 lg:hidden"
      >
        {/* <FontAwesomeIcon icon={sideTreeOpen ? faX : faBars} size="lg" /> */}
      </button>
      <div
      // className={twMerge(
      //   "fixed left-0 top-0 z-40 flex h-screen w-11/12 transform flex-col justify-start gap-8 overflow-y-auto border-r border-gray-300 bg-white p-6 pt-20 text-xs transition-transform duration-300 ease-in-out sm:w-1/2 lg:hidden lg:translate-x-0",
      //   sideTreeOpen
      //     ? "translate-x-10 sm:translate-x-full"
      //     : "translate-x-[200%]"
      // )}
      >
        <div className="flex items-center justify-between gap-6">
          <TreeContentBox label="Warning" status={1} />
          <TreeContentBox label="Critical" status={2} />
          <TreeContentBox label="Danger" status={3} />
        </div>
        {data?.map((node: any) => (
          <TreeNode
            key={node?.caption + node?.id}
            active={node.active}
            caption={node.caption}
            status={node.hasActiveAlarm}
            organizationType={node.organizationType}
            organizationTreeNodeType={node.organizationTreeNodeType}
            deviceModelType={node.deviceModelType}
            deviceModelId={node.deviceModelId}
            id={node.id}
            childList={node.childs}
            parentTitle={node.caption}
          />
        ))}
      </div>
      {sideTreeOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed inset-0 z-30 bg-gray-500 opacity-70 lg:hidden"
        ></button>
      )}
    </div>
  );
}
