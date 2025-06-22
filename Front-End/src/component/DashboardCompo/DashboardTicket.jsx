import TicketDetail from './TicketDetail'

function DashboardTicket({ ticket, myData }) {
    return (
        <section className="mb-8 w-fit">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tickets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {ticket.map(ticketData => (
                    <TicketDetail key={ticketData.id} ticket={ticketData} myData={myData} />
                ))}
            </div>
        </section>
    )
}

export default DashboardTicket
