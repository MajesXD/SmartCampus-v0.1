import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faDog } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import * as Icons from '../../global/icons'

function Panel() {
  return (
    <app class="">
      <FontAwesomeIcon icon={faUser} className="icon" spin />
      <FontAwesomeIcon icon={faDog} style={{ color: "rgb(177, 151, 252)", }} shake />
      <FontAwesomeIcon icon={faTwitter} style={{ color: "rgb(10, 183, 246)", }} />

      nowe ikonki jako obiekty
      <FontAwesomeIcon icon={Icons.faUser} spin/>
      <FontAwesomeIcon icon={Icons.faDog} />
      <FontAwesomeIcon icon={Icons.faTwitter} />
    </app>
  );
}

export default Panel;
