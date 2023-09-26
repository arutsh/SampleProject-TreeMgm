import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { formatDate } from '../../../utils/Utils';

import { NewButton, SaveButton, DeleteButton, CloseButton, EditButton } from '../../../partials/Buttons';
import { NavLink } from 'react-router-dom';
import { TreeQueries } from '../Queries/Queries';


const reducer = (state, action) => {
    console.log("reducer function state, ", state, "action", action)
    switch (action.type) {
        case "Update":
            return state.map((row) => {
               if (row.id === action.data.id) {
           
                    console.log("received action is", action.data)
                    return {...row, ...action.data, edit: !row.edit, modifiedOn: new Date()};
                } else {
                    return row;
                }
        });

        case "Edit":
        return state.map((row) => {
            if (row.id === action.id) {
            console.log("reduce, edit mode", row.edit)
            return { ...row, edit: !row.edit };
          } else {
            return row;
          }
  
        });
        case "Add":
        var id = "LineDraft" + (state.length + 10).toString();
        var row = { id: id,  edit: false, delete: false, ...action.data }
  
        return [row, ...state]
        case "DeleteConfirm":
            return state.map((row) => {
                if (row.id === action.id) {
                // console.log("reduce, delete confirm", row.delete)
                return { ...row, delete: !row.delete };
              } else {
                return row;
              }
            });
  
        case 'Delete':
            // console.log("reduce, delete; state changed to ", state.filter((row) => { return row.id != action.id }));
            return state.filter((row) => { return row.id != action.id })
    
        case 'New':
           return action.data.map(row => {
                return { ...row, edit: false, delete: false , new:false}
      
      
            })

        default:
        // console.log("reducer defualt return, ", state, "action", action)
            return state;
    }
  };




/**
 * Table header for showing  tree type list
 * @returns 
 */


function TableHeader({create}){
    return(
    <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
        <tr>
            <th className="p-2">
                <div className="inner flex font-semibold text-left">Identifier</div>
            </th>
            <th className="p-2">
                <div className="inner flex font-semibold text-left">Location</div>
            </th>
            <th className="p-2">
                <div className="inner flex  font-semibold text-left">Type</div>
            </th>
            <th className="p-2 ">
                <div className="inner flex justify-end font-semibold text-left">Planted on</div>
            </th>
            <th className="p-2 ">
                <div className="inner flex justify-end font-semibold text-left">Updated on</div>
            </th>
            <th className="p-2 ">
                <div className="inner flex justify-end font-semibold text-left">
                    <button onClick={()=>create(true)}>
                        <NewButton/>

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

function TreeList({data}){

    const [treeList, setTreeList] = useReducer(reducer, []);
    const [newTree, setNewTree] = useState(false);
    const [newTreeData, setNewTreeData] = useState();
    const [success, setSuccess] = useState();
    
    const identifierRef = useRef([]);
    const locationRef = useRef([]);
    const typeRef = useRef([]);
    const plantedRef = useRef([]);



    const DeleteTree = useCallback(async({ids})=>{
        console.log("delete id is ", ids)
        const delTreeTypes = await TreeQueries.deleteTree({ids:ids})
    })

    // Set treetypelist received in props and set empty refs for name, lifespan and oxygen
    useEffect(()=>{
        setTreeList({type: "New", data: data});
        // Init refs with empty array with length of received data
        
        identifierRef.current = identifierRef.current.slice(0, data.length);
        locationRef.current = locationRef.current.slice(0, data.length);
        typeRef.current = typeRef.current.slice(0, data.length);
        plantedRef.current = plantedRef.current.slice(0, data.length);
    }, [data])


    async function AddNewTree(){
        setNewTree(false);
        const newTree = await TreeQueries.createTree(newTreeData);
        setSuccess(newTree.status);
        
        // Saves in local var
        setTreeList({type: 'Add', data: newTree.data});
        
    }

    function deleteRow(id){
        // delete row from current list
        setTreeList({type:"Delete", id:id});
        // delete row from db
        DeleteTree({ids:[id]});

    }

    async function saveRow(id){
        // update backend
        var tree = await TreeQueries.UpdateTree({
            id: id,
            identifier: identifierRef.current[id]?.value,
            location: locationRef.current[id]?.value,
            planted_on: plantedRef.current[id]?.value,
            type: typeRef.current[id]?.value
        });

        console.log("received tree is", tree.data);

  // edit treeList 
        setTreeList({ type: "Update", 
            data: tree.data
        });
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
                             onChange={(e)=>setNewTreeData({ ...newTreeData, identifier:e.target.value, modifiedOn:new Date()})}
                             />
                            </div>
                        </td>
                        <td className="p-2">
                            <div className="inner flex items-center text-slate-800 dark:text-slate-100">
                            <input type='text'
                             onChange={(e)=>setNewTreeData({...newTreeData, location:e.target.value, modifiedOn:new Date()})}
                             />
                            </div>
                        </td>
                        <td className="p-2">
                            <div className="inner flex items-center text-slate-800 dark:text-slate-100">
                            <input type='number'
                             onChange={(e)=>setNewTreeData({...newTreeData, type:e.target.value, modifiedOn:new Date()})}
                             />
                            </div>
                        </td>
                        <td className="p-2">
                            <div className="inner flex items-center text-slate-800 dark:text-slate-100">
                            <input type='date'
                             onChange={(e)=>setNewTreeData({...newTreeData, planted_on: e.target.value, modifiedOn:new Date()})}
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
                    {treeList && treeList.map(row=>(
                    <tr className='border-t hover:bg-slate-200' key={row?.id} id={row?.id} >
                        <td className="p-2">
                            <input type={row.edit ? 'text':'hidden'} 
                            defaultValue={row?.identifier}
                            ref={el=>identifierRef.current[row.id] = el}
                            />
                            {!row.edit && (
                            <div  className="inner flex items-center text-slate-800 dark:text-slate-100">
                               {row.identifier}
                            </div>
                            )}
                        </td>
                        <td className="p-2">
                             <input type={row.edit ? 'text':'hidden'} 
                                defaultValue={row?.location}
                                ref={el=>locationRef.current[row.id] = el}
                                />
                            {!row.edit && (
                            <div className="inner flex items-center text-slate-800 dark:text-slate-100">
                                {row?.location}
                            </div>
                            )}
                        </td>
                        <td className="p-2">
                            <input type={row.edit ? 'text':'hidden'} 
                                defaultValue={row?.type?.id}
                                ref={el=>typeRef.current[row.id] = el}
                                />
                            {!row.edit && (
                            <div className="inner flex items-center text-slate-800 dark:text-slate-100">
                                <NavLink to={"types/id"} className="text-teal-700 hover:text-teal-500">
                                    {row?.type?.name}
                                </NavLink>
                            </div>
                            )}
                        </td>
                        <td className="p-2">
                        <input type={row.edit ? 'date':'hidden'} 
                                defaultValue={row?.plantedOn}
                                ref={el=>plantedRef.current[row.id] = el}
                                />
                        {!row.edit && (
                            <div className="inner flex items-center justify-end text-slate-800 dark:text-slate-100">
                                {formatDate(row.plantedOn)}
                            </div>
                        )}
                        </td>
                        <td className="p-2">
                            <div className="inner flex items-center justify-end text-slate-800 dark:text-slate-100">
                                {formatDate(row.modifiedOn)}
                            </div>
                        </td>
                        {/* Delete / New / Edit Column */}
                         <td className="p-2">
                            <div className="inner flex items-center justify-end text-slate-800 dark:text-slate-100">
                            {row.delete ? ( 
                                <div className='flex'>
                                    <button className='px-1' onClick={(()=>deleteRow(row.id))}>Yes</button>
                                    <button className='px-1' onClick={()=>setTreeList({type:"DeleteConfirm", id: row.id })}>No</button>
                                </div>
                            ):(<>
                                {row.edit? (
                                <>
                                    <button className='px-1' onClick={()=>saveRow(row.id)} >
                                        <SaveButton />
                                    </button>
                                    <button className='px-1' onClick={()=>setTreeList({type:'Edit', id: row?.id})}>
                                        <CloseButton />
                                    </button>
                                </>
                                
                                ):(
                                    <>
                                        <button className='px-1' onClick={()=>setTreeList({type:'Edit', id: row?.id})}>
                                            <EditButton />
                                        </button>
                                        <button className='px-1' onClick={()=>setTreeList({type:"DeleteConfirm", id: row.id })}>
                                            <DeleteButton />
                                        </button>
                                    </>
                               )}
                               </>
                            )}
                               
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )

}

export default TreeList