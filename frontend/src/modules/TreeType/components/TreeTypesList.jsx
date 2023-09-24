import React, { useCallback, useEffect, useState } from 'react';
import { formatDate } from '../../../utils/Utils';
import { TreeTypesQueries } from '../Queries/Queries';

/**
 * Table header for showing  tree type list
 * @returns 
 */


function SaveButton(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
    {/* <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
            <path d="M48 96V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V170.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H309.5c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8V184c0 13.3-10.7 24-24 24H104c-13.3 0-24-10.7-24-24V80H64c-8.8 0-16 7.2-16 16zm80-16v80H272V80H128zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"/></svg>
    )
}


function CloseButton(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                {/* <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
    )
}


function NewButton(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
            {/* <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
            <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
    )
}

function TableHeader({create}){
    return(
    <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
        <tr>
            <th className="p-2">
                <div className="inner flex font-semibold text-left">Tree</div>
            </th>
            <th className="p-2">
                <div className="inner flex font-semibold text-left">Lifespan</div>
            </th>
            <th className="p-2">
                <div className="inner flex  font-semibold text-left">Oxygen</div>
            </th>
            <th className="p-2 ">
                <div className="inner flex justify-end font-semibold text-left">Updated on</div>
            </th>
            <th className="p-2 ">
                <div className="inner flex justify-end font-semibold text-left">
                    <button onClick={()=>create(true)}>
                        <NewButton />

                    </button>
                </div>
            </th>
        </tr>
    </thead>
    )
}



/**
 * Simple view for tree types list
 * @param {*} param0 
 * @returns 
 */

function TreeTypesList({data}){

    const [treeTypesList, setTreeTypesList] = useState();
    const [newTree, setNewTree] = useState(false);
    const [newTreeData, setNewTreeData] = useState();
    const [success, setSuccess] = useState();

    const CreateTreeTypes = useCallback(async()=>{
        const newTreeTypes = await TreeTypesQueries.createTreeType({name: newTreeData.name,
                                                                lifespan: Number(newTreeData.lifespan),
                                                                oxygen: Number(newTreeData.oxygen)})
            setSuccess(newTreeTypes.status)
      }, [])

    useEffect(()=>{
        console.log("newTreeData updated ", newTreeData);
    }, [newTreeData])

    useEffect(()=>{
        setTreeTypesList(data);
    }, [data])

    function AddNewTree(){
        // Saves in local var
        setTreeTypesList(treeTypesList=>[...treeTypesList, newTreeData]);
        setNewTree(false);
        CreateTreeTypes()
    }

    return(
        <section  className="overflow-x-auto">
            
            <table className="table-auto w-full dark:text-slate-300">
                <TableHeader create={setNewTree}/>
                <tbody>

                    {newTree && (
                        <tr className='hover:bg-slate-200' >
                        <td className="p-2">
                            <div className="inner flex items-center text-slate-800 dark:text-slate-100">
                             <input type='text'
                             onChange={(e)=>setNewTreeData({ ...newTreeData, name:e.target.value, modifiedOn:new Date()})}
                             />
                            </div>
                        </td>
                        <td className="p-2">
                            <div className="inner flex items-center text-slate-800 dark:text-slate-100">
                            <input type='number'
                             onChange={(e)=>setNewTreeData({...newTreeData, lifespan:e.target.value, modifiedOn:new Date()})}
                             />
                            </div>
                        </td>
                        <td className="p-2">
                            <div className="inner flex items-center text-slate-800 dark:text-slate-100">
                            <input type='number'
                             onChange={(e)=>setNewTreeData({...newTreeData, oxygen:e.target.value, modifiedOn:new Date()})}
                             />
                            </div>
                        </td>
                        <td className="p-2">
                            <div className="inner flex items-center justify-end text-slate-800 dark:text-slate-100">
                              
                            </div>
                        </td>

                        <td className="p-2">
                            <div className="inner flex items-center justify-end text-slate-800 dark:text-slate-100">
                               <button className='px-1'
                                        onClick={()=>AddNewTree()}>
                                <SaveButton/>
                               </button>
                               <button className='px-1' onClick={()=>setNewTree(false)}>
                                <CloseButton/>
                               </button>
                            </div>
                        </td>
                    </tr>
                    )}
                    {treeTypesList && treeTypesList.map(row=>(
                    <tr className='border-t hover:bg-slate-200' id={row?.id}>
                        <td className="p-2">
                            <div className="inner flex items-center text-slate-800 dark:text-slate-100">
                               {row.name}
                            </div>
                        </td>
                        <td className="p-2">
                            <div className="inner flex items-center text-slate-800 dark:text-slate-100">
                                {row.lifespan}
                            </div>
                        </td>
                        <td className="p-2">
                            <div className="inner flex items-center text-slate-800 dark:text-slate-100">
                                {row.oxygen}
                            </div>
                        </td>
                        <td className="p-2">
                            <div className="inner flex items-center justify-end text-slate-800 dark:text-slate-100">
                                {formatDate(row.modifiedOn)}
                            </div>
                        </td>
                         <td className="p-2">
                            <div className="inner flex items-center justify-end text-slate-800 dark:text-slate-100">
                               
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )

}

export default TreeTypesList