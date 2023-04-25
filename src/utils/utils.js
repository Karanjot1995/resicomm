import { formatDistanceToNowStrict } from 'date-fns';

export function convertTo12Hour(time24) {
    var time12 = "";
    var hour24 = parseInt(time24.substring(0, 2));
    var minute = time24.substring(3);
  
    if (hour24 === 0) {
      time12 = "12:" + minute + " AM";
    } else if (hour24 < 12) {
      time12 = hour24 + ":" + minute + " AM";
    } else if (hour24 === 12) {
      time12 = "12:" + minute + " PM";
    } else {
      time12 = (hour24 - 12) + ":" + minute + " PM";
    }
  
    return time12;
  }


  export const Avatar = ({ name }) => {
    const firstLetter = name.charAt(0);
  
    return (
      <div className="avatar-container">
        <div className="avatar-circle">{firstLetter}</div>
      </div>
    );
  };

  export const TimeAgo = ({ timestamp, style }) => {
    const timeAgo = formatDistanceToNowStrict(new Date(timestamp), {
      addSuffix: true,
    });
  
    return <span className={style}>{timeAgo}</span>;
  };