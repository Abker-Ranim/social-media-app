import "./usernameCard.css";

const UsernameCard = () => {
    return (
        <>
            <div className="usernameCard">
                <div className="username_image">
                    <img src="https://images.pexels.com/photos/27525165/pexels-photo-27525165/free-photo-of-lumineux-leger-paysage-gens.jpeg"  />
                </div>
                <div className="username_info">
                    <h3 className="username">ranim abker</h3>
                    <span>@ranim</span>

                </div>
            </div>



        </>
    );
}

export default UsernameCard;