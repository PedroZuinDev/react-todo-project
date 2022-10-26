export const InputWithLabel = (props: any)=>{
    return(
        <>
            <div>
                <span>{props.label}</span>
            </div>
              <input
                value={props.value}
                name={props.name}
                onChange={(ev) => props.handleChange(ev)}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
              />
        </>
    )
}