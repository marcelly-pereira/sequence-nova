import React from 'react';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery-ui/themes/base/all.css';
import 'daterangepicker/daterangepicker.css';
import 'apexcharts/dist/apexcharts.css';
import 'jquery-mask-plugin/dist/jquery.mask.min.js';
import 'jquery-ui/ui/widgets/datepicker.js';
import 'xlsx/dist/xlsx.full.min.js';

const BaseLayout = ({ children }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sequence</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="text/javascript">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "q42lukf0vm");
          `}
        </script>
      </Helmet>
      <div className="wrapper">
        <div className="navbar-custom">
          <div className="topbar container-fluid">
            <div className="d-flex align-items-center gap-lg-2 gap-1">
              <button className="navbar-toggle" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
            </div>
            <ul className="topbar-menu d-flex align-items-center gap-3">
              <li className="dropdown">
                <a className="nav-link dropdown-toggle arrow-none nav-user px-2" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                  <span className="account-user-avatar">
                    <i className="fas fa-user-circle" style={{ fontSize: '30px' }}></i>
                    <span className="d-lg-flex flex-column gap-1 d-none">
                      <h5 className="my-0" style={{ color: '#18183A' }}></h5>
                      <h6 className="my-0 fw-normal" style={{ color: '#6C75A2' }}></h6>
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated profile-dropdown" style={{ backgroundColor: '#ffff', color: 'var(--ct-topbar-item-color)', border: '1px solid #18183A', borderRadius: '5px', marginTop: '20px', paddingTop: '30px', paddingBottom: '30px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)', border: '1px solid var(--ct-border-color)' }}>
                  <a href="#" className="dropdown-item disabled">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                    </svg>
                    <span>Minha Conta</span>
                  </a>
                  <a href="#" className="dropdown-item disabled">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                      <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                      <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52z"/>
                    </svg>
                    <span>Configurações</span>
                  </a>
                  <form id="logout-form" action="#" method="post" style={{ display: 'none' }}>
                  </form>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); document.getElementById('logout-form').submit(); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                      <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                    </svg>
                    <span>Sair</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="leftside-menu">
          <div className="button-sm-hover" data-bs-toggle="tooltip" data-bs-placement="right" title="Show Full Sidebar">
            <i className="ri-checkbox-blank-circle-line align-middle"></i>
          </div>
          <div className="button-close-fullsidebar">
            <i className="ri-close-fill align-middle"></i>
          </div>
        </div>
        {children}
      </div>
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.1.3/js/bootstrap.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.1.3/js/bootstrap.bundle.min.js"></script>
      <script src="/static/assets/js/vendor.min.js"></script>
      <script src="/static/assets/vendor/daterangepicker/daterangepicker.js"></script>
      <script src="/static/assets/vendor/daterangepicker/moment.min.js"></script>
      <script src="/static/assets/vendor/apexcharts/apexcharts.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/5.0.6/jquery.inputmask.min.js"></script>
      <script src="/static/assets/js/app.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.js"></script>
      <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
      <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.4/xlsx.full.min.js"></script>
    </>
  );
};

export default BaseLayout;