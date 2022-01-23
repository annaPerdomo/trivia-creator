// @ts-check
import * as React from "react";

import commonStyles from "../../styles/CommonStyles.module.css";
import styles from "../../styles/DisplayNameSection.module.css";

const {
  centeredHeader,
  contentContainer,
  headerWithBorder,
  noMargin,
  sectionHeight,
} = commonStyles;

const { changeDisplayName, greetingContainer, showChangeDisplayName } = styles;

import { updateUserDisplayName } from "../../redux/reducers/userSlice";
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";

const DisplayNameSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.user.userId);
  const userDisplayName = useAppSelector((state) => state.user.userDisplayName);

  const [userIsChangingDisplayName, setUserIsChangingDisplayName] =
    React.useState(false);

  const [displayName, setDisplayName] = React.useState("");

  const submitNewDisplayName = () => {
    dispatch(updateUserDisplayName({ displayName, userId }));

    setDisplayName(null);
    setUserIsChangingDisplayName(false);
  };

  return (
    <>
      {userIsChangingDisplayName ? (
        <button
          type="button"
          onClick={() => setUserIsChangingDisplayName(false)}
        >
          Cancel
        </button>
      ) : (
        <>
          <div
            className={`${centeredHeader} ${greetingContainer}`}
            onClick={() => setUserIsChangingDisplayName(true)}
          >
            <h4 className={noMargin}>
              Hi&nbsp;
              {userDisplayName || ""}
            </h4>

            <div className={changeDisplayName}>
              <div id="showChangeDisplayName" className={showChangeDisplayName}>
                Click to change display name
              </div>
            </div>
          </div>
        </>
        // <button
        //   type="button"
        //   onClick={() => setUserIsChangingDisplayName(true)}
        // >
        //   Change display name
        // </button>
      )}

      {userIsChangingDisplayName ? (
        <div>
          <label htmlFor="newDisplayName">New Display Name: </label>
          <input
            type="text"
            name="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          ></input>
          <button type="button" onClick={submitNewDisplayName}>
            Submit new display name
          </button>
        </div>
      ) : null}
    </>
  );
};

export default DisplayNameSection;
