interface SubmitButtonProps {
  text: string;
}

function SubmitButton({ text }: SubmitButtonProps) {
  return (
    <button type="submit" className="btn btn-success buttonSend">
      {text}
    </button>
  );
}

export default SubmitButton;