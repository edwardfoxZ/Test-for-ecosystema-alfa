export const Products = () => {
  return (
    <div
      className="max-w-[2000px] h-[90vh] mx-auto place-items-center bg-[#3d247116] backdrop-blur-lg py-32
            rounded-2xl"
    >
      <div className="flex flex-row gap-5 group">
        <div
          className="relative w-[300px] group-hover:shadow-2xl group-hover:shadow-slate-100/15
                 group-hover:drop-shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
        >
          <img
            className="w-full h-full rounded-xl"
            src="https://imgs.search.brave.com/wVz9wQhVbuz-i0XtY-Tz0-pH8tYYpYLKWkghTZ7U_U8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9m/bG93ZXJzLWFnYWlu/c3Qtc2t5XzIzLTIx/NDk0MTcxOTYuanBn/P3NlbXQ9YWlzX2h5/YnJpZCZ3PTc0MCZx/PTgw"
            alt=""
          />
          <span
            className="absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-90 h-0 group-hover:h-1/3 bg-purple-600/70 
                rounded-b-xl transition-all duration-500 ease-out"
          />
        </div>
      </div>
    </div>
  );
};
