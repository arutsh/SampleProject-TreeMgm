import React, { useCallback, useEffect, useState } from 'react';

import Sidebar from '../../../partials/Sidebar';
import Header from '../../../partials/Header';


import TreeList from '../components/TreeList';
import { TreeQueries } from '../Queries/Queries';



function Tree() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState();

  const FetchTrees = useCallback(async()=>{

    const trees = await TreeQueries.getAllTrees({});
    if(trees.status){
      setData(trees.data);
    }
  }, [])

  useEffect(()=>{
    FetchTrees()
  }, [FetchTrees])
  
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

        <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
            <h1 className='text-2xl font-semibold'>
            Trees
            </h1>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          {data && (
            // <TreeTypesList data={data} />
            <TreeList data={data}/>
          )}

            

          </div>
        </main>


      </div>
    </div>
  );
}

export default Tree;