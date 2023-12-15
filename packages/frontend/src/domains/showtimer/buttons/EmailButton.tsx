export const EmailButton: React.FC<{
  sendEmailOfTimes: () => void;
}> = ({ sendEmailOfTimes }) => {
  return (
    <button className="btn flex-1" onClick={sendEmailOfTimes}>
      Email times
    </button>
  );
};
