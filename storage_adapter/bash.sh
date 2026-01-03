cd integrations/ssh/askpass/gtk
make
sudo make install
source ../selector.sh
ssh-add ~/.ssh/id_ed25519
