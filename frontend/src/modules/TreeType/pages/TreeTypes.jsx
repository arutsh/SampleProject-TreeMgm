import React, { useCallback, useEffect, useState } from 'react';

import Sidebar from '../../../partials/Sidebar';
import Header from '../../../partials/Header';
import TreeTypesList from '../components/TreeTypesList';
import { TreeTypesQueries } from '../Queries/Queries';



function TreeTypes() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState();

  const FetchTreeTypes = useCallback(async()=>{
    const treeTypes = await TreeTypesQueries.getAllTreeTypes({});
    if(treeTypes.status){
      setData(treeTypes.data);
    }
  }, [])

  useEffect(()=>{
    FetchTreeTypes()
  }, [FetchTreeTypes])
  
  useEffect(()=>{
    console.log("the fetched tree types are", data);
  }, [data])


  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          {data && (
            <TreeTypesList data={data} />
          )}

            

          </div>
        </main>


      </div>
    </div>
  );
}

export default TreeTypes;