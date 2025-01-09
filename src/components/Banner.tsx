export default function Banner(props: { asset: string; className: string }) {
  return (
    <div
      className={props.className}
      style={{
        borderRadius: 5,
        borderColor: '#dddddd',
        backgroundColor: '#ffffff',
        borderStyle: 'solid',
        boxShadow: '0px 0px 5px 5px #dddddd',
        borderWidth: 0,
        padding: 5,
        width: '12rem',
        height: '6rem',
        margin: 6,
      }}
    >
      <img
        alt="Banner"
        src={props.asset}
        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
      ></img>
    </div>
  );
}
