import Nominee from "../interfaces/nominee";

export default function Profile({ data }: { data: Nominee[] }) {
    return (
        <div id="profile">
            {Item(data)}
        </div>
    );

    function Item(data: Nominee[] = []) {
        return (
            <>
            {
                data.map((item) => {
                    return (
                        <div key={item._id} className="flex" >
                            <div className="item">
                                <img src={item.avatar} alt="profile" />
                                <div className="info">
                                    <h3 className="name text-dark">{item.name}</h3>
                                    <span>{item.section}</span>
                                </div>
                            </div>
                            <div className="item">
                                <span>{item.score.reduce((a,b) => a + b.value, 0)}</span>
                            </div>
                        </div>
                    );
                })
            }
            </>
        );
    }

}