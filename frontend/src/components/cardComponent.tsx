
interface CardProps{
    id: string,
    file_name: string ,
        image_url: string  ,
        name: string,
        url:string,
}

function Card( props : CardProps) {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          className="rounded-lg w-full h-full object-cover"
          src={props.image_url || 'https://storage.googleapis.com/demo-midjourney/images/662a30022c88ebf016f172a8_Catherine_Hyde_V6_p.jpeg'}
          alt={props.file_name || 'Default Image'}
        
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-cyan-300">{props.name || 'Chris Dyer'}</h2>
        {/* <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p> */}
        {/* <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div> */}
      </div>
    </div>
  );
}
export default Card;
