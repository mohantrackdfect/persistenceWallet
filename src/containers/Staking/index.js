import React from "react";
import TokenInfo from "../Common/TokenInfo";
import Validators from "./Validators";
import DelegatedValidators from "./Validators/DelegatedValidators";
import {Nav, Tab} from "react-bootstrap";
import InfoRefresh from "../Refresh";
import {useTranslation} from "react-i18next";

const Staking = () => {
    const {t} = useTranslation();
    return (
        <div className="staking-main-section">
            <TokenInfo/>
            <div className="validators-section">
                <div className="txns-container">
                    <Tab.Container id="lrr" defaultActiveKey="all">
                        <div className="tab-header main-header">
                            <div className="info">
                                <div className="left">
                                    <Nav variant="pills">
                                        <Nav.Item>
                                            <Nav.Link eventKey="all">{t("ALL_VALIDATORS")}</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="delegated">{t("DELEGATED")}</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                                <div>
                                    <InfoRefresh/>
                                </div>
                            </div>

                        </div>
                        <Tab.Content className="main-tab-content">
                            <Tab.Pane eventKey="all">
                                <Validators/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="delegated">
                                <DelegatedValidators/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>


            </div>
        </div>
    );
};
export default Staking;
