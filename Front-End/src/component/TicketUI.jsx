import React from 'react'

function TicketUI({ data }) { 
    return (
        <article key={data.id} className="flex w-full max-h-47 min-h-45 max-w-xl overflow-hidden flex-col items-start justify-between border-1 p-3 border-gray-600 rounded-2xl hover:bg-blue-50">
            <div className="flex w-fit items-center gap-x-4 text-xs">
                <time className="text-gray-500">
                    {data.createdAt}
                </time>
                {data.createAt}
            </div>
            <div className="w-full ">
                <div className="px-3 py-1 float-right text-xs font-semibold mx-4 rounded-full bg-blue-100 text-blue-800 mb-1">
                    <strong className="font-semibold">Status : </strong>
                    {data.status}</div>
            </div>
            <div className="group relative">
                <h3 className="mt-3 ml-4 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                    {data.title}
                </h3>
            </div>
            <div className="relative mt-8 flex items-center gap-x-4">
                <div className="text-sm/6">
                    <div className="flex  [&>*]">
                        <div className="text-gray-700 text-sm mx-4 mb-1">
                            <strong className="font-semibold">Assignee : </strong>
                            <ul className='flex flex-col'>
                                {
                                    data.assignee.map((res, ind) => {
                                        return <li key={ind}>{res}</li>
                                    })
                                }
                            </ul>
                        </div>

                        <div className="text-gray-500 text-xs mx-4 mt-2 float-right">
                            <strong className="font-semibold"></strong>
                            {data.projectName}</div>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default TicketUI


