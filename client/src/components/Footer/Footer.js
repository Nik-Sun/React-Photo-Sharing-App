export const Footer = () => {
    return (

        <footer className="tm-bg-gray pt-5 pb-3 tm-text-gray tm-footer">
            <div className="container-fluid tm-container-small">
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-12 px-5 mb-5">
                        <h3 className="tm-text-primary mb-4 tm-footer-title">About Catalog-Z</h3>
                        <p>This is a photo sharing and downloading app, created as project defence work for the React/JS course @ Softuni. This app is designed to cater to photo enthusiasts of all levels and provides an easy-to-use platform for sharing, downloading, and browsing high-quality images.</p>
                    </div>
                    {/* <div className="col-lg-3 col-md-6 col-sm-6 col-12 px-5 mb-5">
                        <h3 className="tm-text-primary mb-4 tm-footer-title">Our Links</h3>
                        <ul className="tm-footer-links pl-0">
                            <li><a href="#">Advertise</a></li>
                            <li><a href="#">Support</a></li>
                            <li><a href="#">Our Company</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div> */}
                    <div className="col-md-6">
                        <ul className="tm-social-links d-flex justify-content-end pl-0 mb-5">
                            <li className="mb-2"><a href="https://www.facebook.com/bobone.bg"><i className="fab fa-facebook"></i></a></li>
                            <li className="mb-2"><a href="https://twitter.com/PalashevNikolai"><i className="fab fa-twitter"></i></a></li>
                            <li className="mb-2"><a href="https://www.linkedin.com/in/nikolai-palashev-462169266/"><i className="fab fa-linkedin"></i></a></li>

                        </ul>
                        {/* <a href="#" className="tm-text-gray text-right d-block mb-2">Terms of Use</a>
                        <a href="#" className="tm-text-gray text-right d-block">Privacy Policy</a> */}
                    </div>
                </div>
                <div className="row">
                    <div className="text-center">
                        Copyright 2023 Nikolai Palashev. All rights reserved.
                    </div>

                </div>
            </div>
        </footer>



    );
}