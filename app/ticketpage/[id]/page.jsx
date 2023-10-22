import TicketForm from "@/app/(components)/TicketForm";

const getTicketById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/tickets/${id}`);

    if (!res.ok) {
      throw new Error("Failed to get ticket.");
    }

    return res.json();
  } catch (err) {
    console.log(err, "Error");
  }
};

const TicketPage = async ({ params }) => {
  const EDITMODE = params.id !== "new";
  let updateTicketData = {};

  if (EDITMODE) {
    updateTicketData = await getTicketById(params.id);
    updateTicketData = updateTicketData.foundTicket;
  } else {
    updateTicketData = {
      _id: "new",
    };
  }
  return (
    <div>
      <TicketForm ticket={updateTicketData} />
    </div>
  );
};

export default TicketPage;
