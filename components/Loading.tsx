
const Loading = (props:any) => {
  if (props.loading) {
    return (
      <div className="fixed h-screen w-screen inset-0 flex justify-center items-center backdrop-blur-3xl">
        <div className="
          animate-spin 
          inline-block 
          w-20 
          h-20 
          border-t-8
          border-t-blue-500
          rounded-full">
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default Loading