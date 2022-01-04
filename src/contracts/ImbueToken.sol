// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

contract ImbueToken {

    // imbue event detail....    
    struct EventDetail {
        uint _index;
        address _owner; // event's owner
        string _name; // event's name
        uint _start; // when event start...
        uint _duration;
        string _description; // descriptiong about event...
        uint _price; // event's price
        string _streamData;
    }

    mapping(uint => mapping(address => bool)) _purchased_persons; 
    mapping(uint => EventDetail) public _events;
    uint public _event_count = 0;

    event eventAdded(address who);
    event purchaseDone(bool);
    function addEvent(string memory name, uint datetime,uint duration, string memory description, uint price, string memory streamData) public {
        _events[_event_count] = EventDetail(_event_count, msg.sender, name, datetime,duration, description, price, streamData);
        _event_count++;
        emit eventAdded(msg.sender);
    }
    function getUpcomingEvents(address owner, uint _now) public view returns(EventDetail[] memory){
        uint _upcoming_events_count = 0;
        // this is for purchase case...
        if(owner == address(0)){
            for(uint i = 0; i < _event_count; i++)
                if((_events[i]._start + _events[i]._duration * 60 > _now) && _events[i]._owner != msg.sender)
                    _upcoming_events_count++;
            EventDetail[] memory _upcoming_events = new EventDetail[](_upcoming_events_count);
            uint _index = 0;
            for(uint i = 0; i < _event_count; i++){
                
                if((_events[i]._start + _events[i]._duration * 60 > _now) && _events[i]._owner != msg.sender){
                    _upcoming_events[_index] = _events[i];
                    _index++;
                }
            }
            return _upcoming_events;
        }
        // this is for create event case...
        else{
            for(uint i = 0; i < _event_count; i++)
                if((_events[i]._start + _events[i]._duration * 60 > _now) && _events[i]._owner == owner)
                    _upcoming_events_count++;
            EventDetail[] memory _upcoming_events = new EventDetail[](_upcoming_events_count);
            uint _index = 0;
            for(uint i = 0; i < _event_count; i++){
                
                if((_events[i]._start + _events[i]._duration * 60 > _now) && _events[i]._owner == owner){
                    _upcoming_events[_index] = _events[i];
                    _index++;
                }
            }
            return _upcoming_events;
        }
    }
    function addPerson(uint eventIndex) external payable {
        require(eventIndex < _event_count && eventIndex >= 0,"index error");
        EventDetail storage _event = _events[eventIndex];
        require(msg.value >= _event._price, "error occured!");
        require(msg.sender != _event._owner,"owner can`t purchase");
        require(!_purchased_persons[eventIndex][msg.sender], "you already bought this event...");
        _purchased_persons[eventIndex][msg.sender] = true;
        payable(_event._owner).transfer(msg.value);
        emit purchaseDone(true);
    }
    function isPurchased(uint eventIndex) public view returns(bool){
        //require(!_purchased_persons[eventIndex][msg.sender], "error occured!");
        return _purchased_persons[eventIndex][msg.sender];
    }
}