interface DeleteButtonProps {
  onClick: () => void;
}

function DeleteButton(props: DeleteButtonProps) {
  const { onClick } = props;

  return (
    <button className="btn btn-danger btn-sm" onClick={onClick}>
      Eliminar
    </button>
  );
}

export default DeleteButton;