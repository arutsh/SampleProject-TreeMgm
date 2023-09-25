import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { formatDate } from '../../../utils/Utils';
import { TreeTypesQueries } from '../Queries/Queries';
import { NewButton, SaveButton, DeleteButton, CloseButton, EditButton } from '../../../partials/Buttons';


const reducer = (state, action) => {
    // console.log("reducer function state, ", state, "action", action)
    switch (action.type) {
        case "Update":
            return state.map((row) => {
               if (row.id === action.id) {
                    var name = action?.name ? action.name : row.name
                    var lifespan = action?.lifespan ? action.lifespan : row.lifespan
                    var oxygen = action?.oxygen ? action.oxygen : row.oxygen
                    
                    return {...row, name: name, oxygen:oxygen, lifespan:lifespan,  edit: !row.edit, modifiedOn: new Date()};
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

function TreeTypesList({data}){

    const [treeTypesList, setTreeTypesList] = useReducer(reducer, []);
    const [newTree, setNewTree] = useState(false);
    const [newTreeData, setNewTreeData] = useState();
    const [success, setSuccess] = useState();
    const nameRef = useRef([]);
    const lifespanRef = useRef([]);
    const oxygenRef = useRef([]);
    


    const CreateTreeTypes = useCallback(async(data)=>{
        const newTreeTypes = await TreeTypesQueries.createTreeType({name: data.name,
                                                                lifespan: Number(data.lifespan),
                                                                oxygen: Number(data.oxygen)})
            setSuccess(newTreeTypes.status)
      }, [])

    const DeleteTreeTypes = useCallback(async({ids})=>{
        const delTreeTypes = await TreeTypesQueries.deleteTreeType({ids:ids});
    })

    const UpdateTreeTypes = useCallback(async({id, name=null, lifespan=null, oxygen=null})=>{
        const updateTreeTypes = await TreeTypesQueries.UpdateTreeType({
                                                                id:id,
                                                                name: name,
                                                                lifespan: Number(lifespan),
                                                                oxygen: Number(oxygen)})
            setSuccess(updateTreeTypes.status)
      }, [])

 

    useEffect(()=>{
        console.log("newTreeData updated ", newTreeData);
    }, [newTreeData])

    // Set treetypelist received in props and set empty refs for name, lifespan and oxygen
    useEffect(()=>{
        setTreeTypesList({type: "New", data: data});
        // Init refs with empty array with length of received data
        nameRef.current = nameRef.current.slice(0, data.length);
        lifespanRef.current = lifespanRef.current.slice(0, data.length);
        oxygenRef.current = oxygenRef.current.slice(0, data.length);
    }, [data])


    function AddNewTree(){
        // Saves in local var
        setTreeTypesList({type: 'Add', data: newTreeData});
        setNewTree(false);
        CreateTreeTypes(newTreeData)
    }

    function deleteRow(id){

        // delete row from hook
        setTreeTypesList({type:"Delete", id:id})
        // delete row from db
        DeleteTreeTypes({ids:[id]})

    }

    function saveRow(id){
        // edit TreeTypesList 
        setTreeTypesList({
            type:"Update", 
            id: id,
            name: nameRef.current[id]?.value,
            lifespan: lifespanRef.current[id]?.value,
            oxygen: oxygenRef.current[id]?.value
        })

        // update backend
        UpdateTreeTypes({
            id: id,
            name: nameRef.current[id]?.value,
            lifespan: lifespanRef.current[id]?.value,
            oxygen: oxygenRef.current[id]?.value
        })
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
                    <tr className='border-t hover:bg-slate-200' key={row?.id} id={row?.id} >
                        <td className="p-2">
                            <input type={row.edit ? 'text':'hidden'} 
                            defaultValue={row?.name}
                            ref={el=>nameRef.current[row.id] = el}
                            />
                            {!row.edit && (
                            <div  className="inner flex items-center text-slate-800 dark:text-slate-100">
                               {row.name}
                            </div>
                            )}
                        </td>
                        <td className="p-2">
                             <input type={row.edit ? 'number':'hidden'} 
                                defaultValue={row?.lifespan}
                                ref={el=>lifespanRef.current[row.id] = el}
                                />
                            {!row.edit && (
                            <div className="inner flex items-center text-slate-800 dark:text-slate-100">
                                {row.lifespan}
                            </div>
                            )}
                        </td>
                        <td className="p-2">
                            <input type={row.edit ? 'number':'hidden'} 
                                defaultValue={row?.oxygen}
                                ref={el=>oxygenRef.current[row.id] = el}
                                />
                            {!row.edit && (
                            <div className="inner flex items-center text-slate-800 dark:text-slate-100">
                                {row.oxygen}
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
                                    <button className='px-1' onClick={()=>setTreeTypesList({type:"DeleteConfirm", id: row.id })}>No</button>
                                </div>
                            ):(<>
                                {row.edit? (
                                <>
                                    <button className='px-1' onClick={()=>saveRow(row.id)} >
                                        <SaveButton />
                                    </button>
                                    <button className='px-1' onClick={()=>setTreeTypesList({type:'Edit', id: row?.id})}>
                                        <CloseButton />
                                    </button>
                                </>
                                
                                ):(
                                    <>
                                        <button className='px-1' onClick={()=>setTreeTypesList({type:'Edit', id: row?.id})}>
                                            <EditButton />
                                        </button>
                                        <button className='px-1' onClick={()=>setTreeTypesList({type:"DeleteConfirm", id: row.id })}>
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

export default TreeTypesList