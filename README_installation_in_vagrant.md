OpenDisclosure backend installation in Vagrant
=================

Scripts to build Hack Oregon's back end in a vagrant virtual machine.

To install the backend:

####1) Virtual box and vagrant must be installed.

		See https://www.virtualbox.org/ for virtual box.
	
		See http://www.vagrantup.com/ for vagrant.
		
-----------------------
###Important notes on vagrant usage:
	
######a) never run vagrant commands from your home machine as root. 
  ie, if you mistakenly run anything with the pattern 
	
		host machine prompt> sudo vagrant xxx
		
  you will probably need to read [this](http://stackoverflow.com/questions/25652769/should-vagrant-require-sudo-for-each-command) to make everything work right again.
	
  Running code as root from inside of the vagrant machine, ( ex: after >vagrant ssh and before ctrl-d ), is fine. 
	
######b) To restart vagrant a vagrant box, you must first go to the directory where you first initilized and installed the vagrant box. If you type this command:
		
		host machine prompt> vagrant up
		
  in the wrong directory it will cause much confusion and problems. 
	
######c) If you are re-installing the back end and wish to re-install the vagrant instance 
  (the first two commands in step 3), you need to first destroy the previously installed vagrant box
		> vagrant destroy
  Then remove the vagrant config file found in the installation directory. 
		> rm Vagrantfile

-----------------------
####2) Copy this git repository to a folder on your computer and make that folder your working directory.
	
####3) Create a folder in which to install the Vagrant box with the backend
  
####4) Copy the file installBackEnd.sh from this git repository into the vagrant install folder just created
  
####5) Navigate to the Vagrant install folder
  
####6) At a command prompt run these commands to establish the Virtual box and install the server :
  
	host machine prompt> vagrant box add ubuntu14 https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-i386-vagrant-disk1.box
	host machine prompt> vagrant init ubuntu14
	host machine prompt> vagrant up
	host machine prompt> vagrant ssh
	#note: the previous command will take you into the vagrant virtual machine and give you a guest machine prompt
	guest machine prompt> cp /vagrant/installBackEnd.sh ~
	guest machine prompt> sudo chmod 755 ~/installBackEnd.sh
	guest machine prompt> ./installBackEnd.sh
 
 The server should now be installed and the data loaded. All that is left is to make it so the host machine can see the server in the guest machine (by forwarding port 5000), then to start the server.
	
####7) Press 'control + D' to log out of the Vagrant virtual machine; this will give you back the host machine prompt.
 
####8) Enter:
 
 	host machine prompt> vagrant reload
	host machine prompt> vagrant ssh
	guest machine prompt> cd opendisclosure/
	guest machine prompt> foreman start
	
	
####9) The server should now be running. To check that everything was successfull open an internet browser window and enter this in the address bar:
  	
  	127.0.0.1:5000
	
The OpenDisclosure site should come up, and should look pretty much just like the current running [OpenDisclosure website](http://www.opendisclosure.io/). 

####10) Shutting everything down. It is advised that you do not leave vagrant running when it is not needed as this can occasionally cause conflicts if other vagrant machines are initilized which are located in associated directories or use the same ports. 

   To stop the server, at the command prompt where the command
   
	> foreman start command 
	
  was entered, press 'control + C'. 
  
  To stop vagrant, enter 'control + D' to return to the host machine, then enter this command at the command line:
  
  	host machine prompt> vagrant halt

