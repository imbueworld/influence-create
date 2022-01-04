export default function WalletSelector(props) {
  const image = props.image;
  const name = props.name;
  return (
    <div className="rounded-3 my-3 px-5">
      <div className="grid gird-cols-6">
        <div className="cols-start-1 cols-end-4">
          <img src={image} alt={image} />
        </div>
        <div className="cols-end-6 cols-span-2">{name}</div>
      </div>
    </div>
  );
}
